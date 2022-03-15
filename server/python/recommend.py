#-*- coding:utf-8 -*-
import sys
import json
import io
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import euclidean_distances
from sklearn.metrics.pairwise import cosine_similarity
import requests
import json
import os
import time




def recommend(address, price, transit, options):
    global df
    df = pd.read_csv('./python/region_last.csv', index_col=0)
    
    #옵션가지고 데이터프레임 만들기
    cols = ['address','공시가격','좌표']
    cols = cols + options
    df = df[cols].copy()
    
    #옵션이 0인 주소들 삭제 
    for i in range(len(cols)):
        idx = df[df[cols[i]] == 0].index
        df = df.drop(idx)
    
    #데이터 백업
    data = df[cols].copy()
    data_backup = data.copy()
    data_backup = data_backup.set_index('address')

    #minmax 
    scaler = MinMaxScaler()
    col_name = data.columns.difference(['address','좌표','공시가격'])
    data[col_name] = scaler.fit_transform(data[col_name])
    
    price_info = df['공시가격']
    price_info['비교'] = price[1]
    
    loc_info = df['좌표']
    loc_info['비교'] = address    
    data = data.set_index('address')
    
   
    
    #비교 행 만들기
    data.loc['비교'] = 1.0

    if '범죄안전등급' in data.columns:
        data.loc['비교', '범죄안전등급'] = 0.0
    
    if '미세번지' in data.columns:
        data.loc['비교', '미세먼지'] = 0.0
  
    data.loc['비교', '공시가격'] = price[1]
    data.loc['비교', '좌표'] = address    
    
    #유클리디안 거리
    euclidean = euclidean_distances(data[data.columns.difference(['좌표','공시가격'])],data[data.columns.difference(['좌표','공시가격'])])##여기서부터~~~~좌표, 공시가격 삭제
    distance = euclidean[-1, :].reshape(-1)
    data['distance'] = distance
    #정렬
    data = data.sort_values(by='distance',ascending=True)
    
    #'비교'행 제외
    data2 = data.drop('비교').copy()
    
    # 가격 필터
    data2 = data2[(data2['공시가격'] >= price[0]) & (data2['공시가격'] <= price[1])]
    #print('가격 필터 :   ', data)
    
    
    
    # 통근방법 필터
    if (transit[0] == 'walking'):
        filtered_idx = walking_api(address, transit, data2)
        #print('*****walk:   ', filtered_idx)

        
    elif (transit[0] == 'driving'):
        filtered_idx = driving_api(address, transit, data2)
        #print('*****driving:    ', filtered_idx)
    
    else:
        filtered_idx = bus_subway_api(address, transit, data2)
        #print('*****bus_subway:    ', filtered_idx)
    
    if len(filtered_idx) < 3:
        #오류처리
        ####print('조건에 맞는 지역이 없습니다. 조건을 다시 설정해주세요')
        return filtered_idx
        
    index = []
    for i in filtered_idx.keys():
        index.append(i)
  
    
    filtered_df = data_backup.loc[index] 
    filtered_df['교통편'] = filtered_idx.values() ####나중에 통근시간으로 고치기
 
    
    filtered_df = filtered_df.reset_index(drop=False)
    filtered_df = filtered_df.to_json(force_ascii=False, orient='records')
    
    return filtered_df



def driving_api(address, transit, data2):
    
    endAddr = address.split(',')
    endX = endAddr[1]
    endY = endAddr[0]
    
#     filtered_idx = {}
#     idx_content = {}
    filtered = {}
    
    origin_list = data2['좌표']    
 
    for idx in origin_list.index:
        origin = origin_list[idx]
  
        if(len(filtered)) < 3:
            startAddr = origin.split(',')
            startX = startAddr[1]
            startY = startAddr[0]
            url = 'https://apis.openapi.sk.com/tmap/routes/prediction?appKey='+key['tmap']+'&version=1'

            values = { 
                "routesInfo": {
                    "departure": {
                        "name": "출발지",
                        "lon": startX,
                        "lat": startY
                        },
                    "destination": {
                        "name": "도착지",
                        "lon": endX,
                        "lat": endY
                        },
                        "predictionType": "arrival",
                        "predictionTime": "2022-04-01T08:00:00+0900"
                        }
                    }

            response = requests.post(url, data=json.dumps(values))
            content= response.json()

            totalTime = content['features'][0]['properties']['totalTime']
            if totalTime <= (transit[1]*60):
                filtered[idx] = totalTime
        else:
            #print(filtered)
            return filtered
                
        
def bus_subway_api(address, transit, data2):
    
    filtered = {}
    
    origin_list = data2['좌표']
    
    for idx in origin_list.index:
        origin = origin_list[idx]
        
        if(len(filtered)) < 3:

            departure_time  = 1648767600 #2022 04 01 am8 timestamp
            
            params = {
              "origin" : origin,
              "destination" : address,
              "mode" : "transit",
              "transit_mode" : transit[0],
              "departure_time" : departure_time,
              "language":"ko",
              "key": key['google']
          }


            url = "https://maps.googleapis.com/maps/api/directions/json?"
           
            response = requests.post(url, params=params)
            content = response.json()
            
            path = content["routes"][0]["legs"][0]
            totalTime = path["duration"]["value"]

            if totalTime <= (transit[1]*60):
                filtered[idx] = totalTime
                
                #idx_content[len(filtered_idx)] = content
        else:
            return filtered


def walking_api(address, transit, data2): #address:직장 origin:집
    #address_walk = []
    
    # address의 구에 소속된 것 가져오기
    address = address.split(',')
    address_re = address[1] + ',' + address[0]
    address_url = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords={a}&orders=legalcode&output=json".format(a= address_re)
    client_id = key["naverid"]
    client_pw = key["naverpw"]
    
    headers = {"X-NCP-APIGW-API-KEY-ID" : client_id,"X-NCP-APIGW-API-KEY":client_pw }
    result = json.loads(str(requests.get(address_url, headers=headers).text))
    
    try:
        place = result['results']
        top = place[0].get('region').get('area1').get('name')
        city = place[0].get('region').get('area2').get('name')
        search_addr = top #+ ' ' + city # 직장 주소가 속한 시군구
        #print('직장주소: ',search_addr)
        #print('=========data: ', data)
 
        df_walk = data2.index.str.contains(search_addr)
        df_walk = data2.iloc[df_walk]
        #print('df_walk: ', df_walk) ####here!
        address_walk = df_walk['좌표']

    except:
        return

        #print('조건에 맞는 장소가 없습니다. 조건을 다시 설정해주세요')
    #print('address_walk: ', address_walk)
    #print(address_walk[0])
    if len(address_walk) == 0 :
        #print('조건에 맞는 장소가 없습니다. 조건을 다시 설정해주세요')
        return 
    
    # 각 후보주소 도보 시간 구하기
    filtered = {}
    
    for idx in address_walk.index:
        origin = address_walk[idx]
        #print('idx:',idx )
        #print('walk origin :**************', origin) ###이거까진 ok
        
        if(len(filtered)) < 3:
            #print('들어옴')
            startAddr = origin.split(',')
            startX = startAddr[1]
            startY = startAddr[0]
            #print(startX, 'startX')

            params = { 
                "startX":startX,
                "startY":startY,
                "endX":address[1],
                "endY":address[0],
                "startName":"출발지",
                "endName":"도착지"
                }

            url = 'https://apis.openapi.sk.com/tmap/routes/pedestrian?appKey='+key['tmap']+'&version=1&startX='+startX+'&startY='+startY+'&endX='+address[1]+'&endY='+address[0]+'&startName=출발지&endName=도착지'
            response = requests.post(url)
            content_1 = response.json()
            #print(content_1)


            try:
                totalTime = content_1['features'][0]['properties']['totalTime']
            except:
                time.sleep(2)
                try:
                    response = requests.post(url)
                    content_1 = response.json()
                    totalTime = content_1['features'][0]['properties']['totalTime']
                except:
                    return filtered
            # 시간 조건이 맞으면?
            if totalTime <= (transit[1]*60):
                filtered[idx] = totalTime
                
        else:
            #print('***walk filtered: ' ,filtered)
            return filtered
    return filtered


if __name__ == '__main__':
    
    sys.stdout= io.TextIOWrapper(sys.stdout.detach(),encoding='utf-8')
    sys.stderr= io.TextIOWrapper(sys.stderr.detach(),encoding='utf-8')
    address = sys.argv[1] #address
    price1 = sys.argv[2] #가격1
    price2 = sys.argv[3] #가격2
    way = sys.argv[4] #교통편(4가지)
    time = sys.argv[5] #limit time
    options = sys.argv[6].split(",") #옵션
    
    
    price1= int(price1)
    price2 = int(price2)
    time = int(time)
    price = [price1,price2]
    transit = [way, time]
    
    #api인증키 가져오기
    global key
    path = os.getcwd()
    with open(path+"\python\key.json","r") as keyJson :
        key = json.load(keyJson)
    
   
    
    #주소, [가격], [모드, 시간], 옵션
    try:
        result = recommend(address, price, transit, options)
        if len(result) < 3:
            print('error')
        else: print(result)
    except:
        print('error')
        

    #result = recommend("37.546475,126.964692",[0,400000000],["walking", 60],["학교","범죄안전등급"])
    #print(result)


    
    
#-*- coding:utf-8 -*-
import sys
import json
import io
import pandas as pd
from sklearn import preprocessing
from sklearn.metrics.pairwise import euclidean_distances
from sklearn.metrics.pairwise import cosine_similarity
import requests
import json
import os
import time



def transit_api(address, transit, origin_list): #
    destination = address
    #mode = 'transit'
    transit_mode = transit[0]
    limit_time = transit[1]
    
    filtered_idx = {}
    idx_content={}
    

    for origin in origin_list:
        if len(filtered_idx) < 3:

            departure_time  = 1648767600 #2022 04 01 am8 timestamp
            params = {
              "origin" : origin,
              "destination" : address,
              "mode" : "transit",
              "transit_mode" : transit_mode,
              "departure_time" : departure_time,
              "language":"ko",
              "key": key['google']
          }


            url = "https://maps.googleapis.com/maps/api/directions/json?"
           
            response = requests.post(url, params=params)
            content = response.json()

            path = content["routes"][0]["legs"][0]
            duration_sec = path["duration"]["value"]

            if duration_sec <= (limit_time*60):
                filtered_idx[origin] = duration_sec
                
                idx_content[len(filtered_idx)] = content
                    
    return filtered_idx


def walking_driving(address, transit, origin_list):
    endAddr = address.split(',')
    endX = endAddr[1]
    endY = endAddr[0]

    transit_mode = transit[0]
    limit_time = transit[1]

    filtered_idx = {}
    idx_content={}

    if (transit_mode == 'walking'):

        for origin in origin_list:
            if len(filtered_idx) < 3:
                startAddr = origin.split(',')
                startX = startAddr[1]
                startY = startAddr[0]

                params = { 
                    "startX":startX,
                    "startY":startY,
                    "endX":endX,
                    "endY":endY,
                    "startName":"출발지",
                    "endName":"도착지"
                    }



                url = 'https://apis.openapi.sk.com/tmap/routes/pedestrian?appKey='+key['tmap']+'&version=1&startX='+startX+'&startY='+startY+'&endX='+endX+'&endY='+endY+'&startName=출발지&endName=도착지'
                response = requests.post(url)
                content_1 = response.json()
                

                try:
                    totalTime = content_1['features'][0]['properties']['totalTime']
                except:
                    time.sleep(1)
                    response = requests.post(url)
                    content_1 = response.json()
                    totalTime = content_1['features'][0]['properties']['totalTime']

                    if totalTime <= (limit_time*60):
                        filtered_idx[origin] = totalTime
                                
                        idx_content[len(filtered_idx)] = content
                
        return filtered_idx


    else: #driving

        for origin in origin_list:
            if(len(filtered_idx)) < 3:
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
                if totalTime <= (limit_time*60):
                    filtered_idx[origin] = totalTime
                        
                    idx_content[len(filtered_idx)] = content
                
        return filtered_idx

def recommend(address, price, transit, option): 
    df = pd.read_csv('./python/train_all.csv')
    col = ['address']
    options = option
    for i in range(len(options)):
        col.append(options[i])
    #print(col)
    for i in range(len(col)):
        idx = df[df[col[i]] == 0].index
        df=df.drop(idx)
    data = df.copy()

    data = df.copy()
    data = data[col]
    data = data.set_index('address')
    
    data_max= data.iloc[:,:5].max(axis=0)
    data_max['address'] = '비교'
    data = data.reset_index(drop=False)
    data = data[col].append(data_max, ignore_index=True)
    data = data.set_index('address')
    
    col.append('공시가격')
    col.append('좌표')
    data_ = df[col]

    data_max_= data_.iloc[:,:6].max(axis=0)
    data_max_['address'] = '비교'
    data_ = data_[col].append(data_max_, ignore_index=True)
    data_ = data_.set_index('address')
    
    
    scaler = preprocessing.MinMaxScaler()
    data[data.columns] = scaler.fit_transform(data[data.columns])
    #print(data)
    euclidean = euclidean_distances(data ,data)
    distance = euclidean[-1, :].reshape(-1)
    
    data = data.reset_index(drop=False)
    index_distance = {}
    for idx, val in enumerate(distance):
        index_distance[idx] = val

    for i in range(len(index_distance)):
        #index = index_distance[i][0]
        distance = index_distance[i]
        data.loc[i,'distance'] = distance
    dc = data.sort_values(by='distance', ascending=True)
    dc = dc.set_index('address')
    #print(dc)
    data2 = dc[['distance']]
    
    data2 = data2.join(data_)
    data2 = data2.fillna(0)
    comp = data2.iloc[0]
    #print(comp)
    
    data2 = data2.drop('비교')
    #print('data2', data2)
    
    #price = [1,3]
    condition = (data2['공시가격'] > price[0]) &(data2['공시가격'] < price[1])
    price_data = data2[condition]
    
    origin_list = price_data['좌표'].tolist()
    #print(origin_list)
    if (transit[0] == 'driving')|(transit[0] == 'walking'):
        filtered_idx = walking_driving(address, transit, origin_list)
    else: filtered_idx = transit_api(address, transit, origin_list)
    #print(filtered_idx)
    
    comp = comp.to_frame()
    comp =comp.T
    for i in range(len(filtered_idx)):
        comp = comp.append(price_data[(price_data['좌표']==(list(filtered_idx.keys())[i]))])
    
    comp['공시가격'][0] = price
    comp['좌표'][0] = address
    comp['교통편']=0
    trans = list(filtered_idx.values())
    for i in range(len(filtered_idx)):
        comp['교통편'][i+1]= trans[i]
    comp['교통편'][0] = transit[1]*60
    #print('교통편성공')
    comp = comp.reset_index(drop=False)
    #comp.to_csv('./교통추천결과값4.csv',encoding='euc-kr')
    result = comp.to_json(force_ascii=False, orient='records')
    #print(comp)
    #print(result)
    return result

if __name__ == '__main__':
    
    sys.stdout= io.TextIOWrapper(sys.stdout.detach(),encoding='utf-8')
    sys.stderr= io.TextIOWrapper(sys.stderr.detach(),encoding='utf-8')
    args1 = sys.argv[1] #address
    args2 = sys.argv[2] #가격1
    args3 = sys.argv[3] #가격2
    args4 = sys.argv[4] #교통편(4가지)
    args5 = sys.argv[5] #limit time
    

    args6 = sys.argv[6].split(",") #이게옵션

    # print('args1: ',args1)
    # print('args2: ',args2) #price[0]
    # print('args3: ',args3) #price[1]
    # print('args4: ',args4) #transit_mode
    # print('args5: ',args5) #limit
    # print('args6: ',args6) #option
    
    args2 = int(args2)
    args3 = int(args3)
    args5 =int (args5)
    price = [args2,args3]
    transit = [args4, args5]
  
  
    global key
    path = os.getcwd()
    with open(path+"\python\key.json","r") as keyJson : #api 인증키 가져오기
        key = json.load(keyJson)

    #주소, [가격], [모드, 시간], 옵션
    result = recommend(args1, price, transit,args6)
    #result = recommend("37.546475,126.964692",[0,3000000000],["bus", 60],["공원","영화관"]
    print(result)

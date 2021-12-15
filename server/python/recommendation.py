#-*- coding:utf-8 -*-
import sys
import json
import io
import pandas as pd
from sklearn import preprocessing
from sklearn.metrics.pairwise import euclidean_distances
from sklearn.metrics.pairwise import cosine_similarity
import time
import json
import os
import ssl
import urllib.request


def transit_api(address, transit, origin_list): #
    destination = address
    mode = 'transit'
    transit_mode =transit[0]
    limit_time = transit[1]
    
    filtered_idx = {}
    idx_content={}


    #if (__name__ == "__main__"):
        #client = None
    with open("C:\proj\server\python\google_key.json","r") as clientJson :
        client = json.load(clientJson)
        
        #print(origin_list)

    for origin in origin_list:
        if len(filtered_idx) < 3:

            departure_time  = "1640818800" #2021 12 30 AM8:00 TIMESTAMP
            key             = client['key']
           

            url = "https://maps.googleapis.com/maps/api/directions/json?origin="+ origin + "&destination=" + destination + "&mode=" + mode+ "&transit_mode="+ transit_mode + "&departure_time=" + departure_time + "&language=ko"+ "&key=" + key

            request         = urllib.request.Request(url)
            context         = ssl._create_unverified_context()
            response        = urllib.request.urlopen(request, context=context)
            responseText    = response.read().decode('utf-8')
            content    = json.loads(responseText)
            #print(content)
            path   = content["routes"][0]["legs"][0]
            duration_sec  = path["duration"]["value"]
            #print(duration_sec)
            if duration_sec <= (limit_time*60):
                filtered_idx[origin] = duration_sec
                
                idx_content[len(filtered_idx)] = content
                #with open("./result2.json","w") as json_file:
                   # json.dump(idx_content, json_file, indent=4)
                    
    return filtered_idx 

def recommend(address, price, transit, option): 
    df = pd.read_csv('C:/proj/server/python/train_all.csv')
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
    filtered_idx = transit_api(address, transit, origin_list)
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
  
  
  #주소, [가격], [모드, 시간], 옵션
    result = recommend(args1, price, transit,args6)
    #result = recommend("37.546475,126.964692",[0,3000000000],["bus", 60],["공원","영화관"]
    print(result)
    

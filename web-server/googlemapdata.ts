import fs from 'fs';
import { client } from './server';

const gymRoomData = JSON.parse(fs.readFileSync("./gymroomdata.json","utf8"));
// console.log(gymRoomData)

let newGymDatas = gymRoomData.map(function(ele:any){
    let newGymData ={}
    newGymData["district_en"] = ele.District_en;
    newGymData["name_en"] = ele.Name_en;
    newGymData["address_en"] = ele.Address_en;
    newGymData["size_en"] = ele.Size_en;
    newGymData["longitude"] = parseLatLon(ele.Longitude);
    newGymData["latitude"] = parseLatLon(ele.Latitude);
    return newGymData
})

//Convert Lat and Long to DMS (https://www.latlong.net/degrees-minutes-seconds-to-decimal-degrees)
//d+ (min/60)+(sec/3600)
function parseLatLon(num:string){
    let newNum = num.split("-");
    let ans:number = +newNum[0]+(+newNum[1]/60)+(+newNum[2]/3600)
    return ans
}

// console.log(newGymData)

for (let newGymData of newGymDatas){
    client.query("INSERT INTO gym_room(district_en,name_en,address_en,size_en,longitude,latitude) VALUES($1,$2,$3,$4,$5,$6)",[newGymData.district_en,newGymData.name_en,newGymData.address_en,newGymData.size_en,newGymData.longitude,newGymData.latitude]) 
}
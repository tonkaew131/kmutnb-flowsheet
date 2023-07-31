from bs4 import BeautifulSoup
import requests
import random
import json
import time

COOKIE_HEADER = ""

def getDepartment(facCode):
    URL = "http://klogic.kmutnb.ac.th:8080/kris/curri/index.jsp?sPage=struct"
    page = requests.post(URL, data={"facCode": facCode})

    data = {}

    soup = BeautifulSoup(page.content, "html.parser")
    deptCode = soup.find(attrs={"name": "deptCode"})
    deptOptions = deptCode.find_all("option")
    for f in deptOptions:
        deptName = f.text.replace("\n", "").replace("\t", "")
        if("เลือกภาควิชา" in deptName):
            continue

        print("Found: ", deptName)

        deptId = f.attrs["value"]
        data[deptId] = {"name": deptName}

    return data

def getCurriculum(currCode):
    URL = "http://klogic.kmutnb.ac.th:8080/kris/curri/index.jsp?sPage=struct"
    page = requests.post(URL, data={"deptCode": currCode}, headers={"Cookie": COOKIE_HEADER})

    data = {}

    soup = BeautifulSoup(page.content, "html.parser")
    currCode = soup.find(attrs={"name": "currCode"})
    currOptions = currCode.find_all("option")
    for f in currOptions:
        currName = f.text.replace("\n", "").replace("\t", "")
        if("เลือกหลักสูตร" in currName):
            continue

        print("Found: ", currName)

        currId = f.attrs["value"]
        data[currId] = {"name": currName}

    return data

data = {}

URL = "http://klogic.kmutnb.ac.th:8080/kris/curri/index.jsp?sPage=struct"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

facCode = soup.find(attrs={"name": "facCode"})
facOptions = facCode.find_all("option")
for f in facOptions:
    facName = f.text.replace("\n", "").replace("\t", "")
    if("เลือกคณะ" in facName):
        continue

    facId = f.attrs["value"]
    data[facId] = {"name": facName}

    print("Getting department of " + facName + "...")
    time.sleep(random.random() * 5 + 5)
    depts = getDepartment(facId)

    for d in depts:
        print("Getting curriculum of " + d + " "+ depts[d]["name"] + "...")
        time.sleep(random.random() * 5 + 5)
        currs = getCurriculum(d)
        depts[d]["curriculums"] = currs

    data[facId]["departments"] = depts

with open("courses.json", "w", encoding='utf8') as outfile:
    json.dump(data, outfile, ensure_ascii=False)

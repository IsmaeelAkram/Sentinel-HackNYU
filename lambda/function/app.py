import dotenv

dotenv.load_dotenv()
import json
import os

import bs4
import requests
from pymongo import MongoClient


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client["sentinel"]
    collection = db["scans"]

    # protected = requests.get("https://web-api.nordvpn.com/v1/ips/info")
    # data = protected.json()
    # ip = data["ip"]
    # isp = data["isp"]
    # protected = data["protected"]

    params = event["queryStringParameters"]
    if not params:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps(
                {
                    "message": "Sentinel API - No parameters provided",
                }
            ),
        }

    policyUrl = params.get("policyUrl")
    if not policyUrl:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps(
                {
                    "message": "Sentinel API - No policy URL provided",
                }
            ),
        }

    print("Policy URL: ", policyUrl)

    # Check if scans collection already contains scan with this policy URL
    scan = collection.find_one({"url": policyUrl})
    if scan:
        print("Returning privacy policy from cache...")
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps(
                {
                    "message": "Sentinel API - Go HackNYU!",
                    "policy": scan["data"],
                }
            ),
        }

    response = requests.get(policyUrl)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    p_tags = soup.find_all("p")

    policyText = ""
    for paragraph in p_tags:
        policyText += paragraph.get_text() + "\n"
    print(policyText)

    # Call OpenAI
    chat_res = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + os.getenv("OPENAI_KEY"),
        },
        json={
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": 'A user has opened a website and the privacy policy text (given) of the website has been extracted. Give it a \'privacy score\' from 0 to 100 based on how much information it collects from the user, how it handles this data, and any relevant concerns a user might possibly have. Then, list concerns a user might have about this privacy policy, if any. Return the data in JSON format as follows: {"concerns": [{"title": ", "description": "}, ...], "score": 0-100}. DO NOT explain yourself or say anything besides the JSON output. Do not put the JSON in markdown either.',
                },
                {"role": "user", "content": policyText},
            ],
        },
    )
    data = chat_res.json()
    res = data["choices"][0]["message"]["content"]
    print("---")
    print(res)
    data = json.loads(res)
    collection.insert_one({"url": policyUrl, "policy": policyText, "data": data})

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps(
            {
                "message": "Sentinel API - Go HackNYU!",
                # {"protection": {"protected": protected, "ip": ip, "isp": isp}},
                "policy": data,
            }
        ),
    }

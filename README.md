## Inspiration
Over the past few years, there have been many controversies surrounding our favorite websites.
We trust them with our time, but we can’t trust them with our data. 
Sentinel aims to clarify how websites are handling our data, without users needing to read lengthy privacy policies.

## What it does
Sentinel analyzes the privacy policies of the websites you visit everyday. 
Based on the severity and quantity of concerns found in the privacy policy, the website is assigned a score, and specific concerns are listed to the user, which they can click for more details and an easy explanation.
Sentinel also warns the user when their IP address is exposed (not connected to VPN) and suggests using a VPN.

## How we built it
We used the Chrome Extension API to inject a script into the web page to search for the link of the website's privacy policy. We noticed that virtually every website has a link to its privacy policy in the footer. This was used in tandem with React.js to create a responsive web app that works within the extension. 
When a tab is opened, this frontend makes a request to the server-less AWS API Gateway, which routes to a Python AWS Lambda function that fetches the privacy policy from the URL found, parses its text, and scans it using OpenAI's API. 
OpenAI is prompted to highlight security concerns and score the website's privacy based on the quantity and severity of the concerns found. 
However, before any of this scanning occurs, our API searches MongoDB for a previous scan on that domain. If a scan is found, the scanning process is skipped and the cache is returned to the frontend to speed up the process.
The cherry on top: We used a NordVPN API route to check if the browser's IP address is protected (residential or VPN) and suggests using a VPN while browsing.

## Challenges we ran into
The largest challenge we ran into was setting up the initial environment with Chrome and React. The two are not made to be used with one another. We tried different boilerplates, but ended up creating our own structure.
We tried to use TailwindCSS to speed up our designing, but it was incredibly difficult because the documentations of different versions were inconsistent and new versions made old setups obsolete.
and ensuring that there weren't conflicts with dependencies and our respective package managers.
We also experienced much difficulty setting React states within Chrome events. Chrome extensions require events to be created and called when browser scripts are run, and a lot of our code was simply not executing because of it.

## What we learned
We learned how to combine many different technologies to make a fully functioning application. We also had to do a lot of testing and perfect our searching algorithm so it works on almost all websites. We learned about MongoDB SSL certificates, network access-lists, and caching.

## What's next for Sentinel - Safeguarding your data on the web
A feature we would like to implement is checking the security of a website's payment processor. Financial information is critical, and if corporations aren't taking the utmost care to ensure that information is secure in something as simple their payment processors, users should be aware of that.

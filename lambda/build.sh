cd function
rm build.zip
pip3 install --target package -r ./requirements.txt
cd package
zip -r ../build.zip *
zip ../build.zip ../app.py
cd ../..
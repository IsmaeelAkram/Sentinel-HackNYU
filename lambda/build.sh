cd function
rm build.zip
# rm -rf package
pip3 install --target package -r ./requirements.txt
cd package
zip -r ../build.zip *
zip ../build.zip ../app.py
zip ../build.zip ../.env
cd ../..
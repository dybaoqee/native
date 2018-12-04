code-push deployment ls $CODEPUSH_APP_NAME -k --format json > tmp/codepush.json
if [ $CODEPUSH_DEPLOYMENT_TARGET == "Production" ];
then configKey="0";
else configKey="1"; fi
node -e "console.log(require('./tmp/codepush.json')[$configKey].key)"

# env=${1} # 获取终端输入的第一个参数，若为空则为auto commit
# testPwd='test'
# prodPwd='master'
# # 获取当前分支
# branch=`git branch | grep "*"`
# # 截取分支名
# currentBranch=${branch:2}
npm run build
tar -zcvf ./dist.tar.gz dist
# if [ "$currentBranch" != "$env" ];then
#   echo '当前分支与执行的命令不相符，请检查分支并且保证已经合并分支';
#   echo "当前分支" $currentBranch;
#   echo "当前打包的环境" $env;
#   echo "执行脚本命令方式 ——>  sh bin/build.sh [环境]";
#   exit 1;
# else 
#   if [ "$currentBranch" == "test" ];then
#   read -p "您正在打包**测试**，请输入秘密" -s pwd;
#     if [ "$pwd" == $testPwd ];then
#     echo "$pwd"
#     npm run build-test
#     else
#     echo "*****密码不正确******"
#     fi
#   elif [ "$currentBranch" == "master" ];then
#   read -p "您正在打包**生产**，请输入秘密" -s pwd
#     if [ "$pwd" == $prodPwd ];then
#     echo "$pwd"
#     npm run build-prod
#     else
#     echo "*****密码不正确******"
#     fi
#   fi
# fi
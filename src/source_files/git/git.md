1.配置 

  

git config –global user.name ‘xxxxx’ 

git config –global user.email ‘xxx@xx.xxx’

2.生成秘钥 

ssh-keygen -t rsa -C ‘上面的邮箱’

mac 获取ssh  cat ~/.ssh/id_rsa.pub

git config core.ignorecase false 大小写敏感

版本回退

git   log

git re**set** --hard HEAD^

git reset --hard 1094a

git  reflog

查看工作区和版本库  暂存区

git diff HEAD -- readme.txt

git reset HEAD readme.txt 拉取最近一次提交到版本库的文件到暂存区 改操作不影响工作区

git checkout -- readme.txt 拉取暂存区文件 并将其替换成工作区文件

远程仓库

添加远程仓库 并push

 git remote add origin git@github.com:michaelliao/learngit.git

 git push -u origin master

 git push origin master

克隆项目 

git clone git@github.com:michaelliao/gitskills.git

分支

查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>

1.按键盘字母 i 进入insert模式

2.修改最上面那行黄色合并信息,可以不修改

3.按键盘左上角"Esc"

4.输入":wq",注意是冒号+wq,按回车键即可

git pull --allow-unrelated-histories
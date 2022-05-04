## git 常用指令

### git 配置

```bash
# 作用域，优先 --global
# 不加修饰符，仅针对当前项目，作用域最小
--global # 登录这台计算机的用户，作用域中等
--system # 整台电脑，任意用户、任意项目，作用域最大

# 设置名称
git config --global user.name "your_name"
# 设置邮箱
git config --global user.email "your_email"
# 设置别名
git config --global alias.别名 "配置项"
# 查看当前用户配置（global）
git config --global --list
# 删除配置项
git config --global --unset 配置信息
```

### git 增删查改

```bash
# 初始化本地仓库
git init
# 添加文件到暂存区
git add .
# 将暂存区的内容添加到仓库中
# 提供一个“-a”配置项，跳过暂存区(git add)，直接提交
git commit -m "注释内容"
git commit （会启动文本编辑器在非注释行中添加注释,“esc” + “：”+ “wq”退出）
# 查看文件状态（已提交，已暂存，已修改）
git status
# 查看历史记录
git log
git log --oneline （ 每个版本一行显示）
# 查看哪些更新还没被暂存
git diff
# 查看哪些更新已暂存未提交
git diff -staged
# 删除本地仓库（linux）
find . -name ".git" | xargs rm -Rf
```

### git 分支

```bash
# 查看整个项目分支
git log --oneline --decorate --graph --all
# 查看分支表
git branch
# 查看分支指向的最新提交
git branch -v: 查看分支指向的最新的提交
# 在当前对象上创建新的分支
git branch 分支名
# 在指定对象上创建新的分支（时光机）
git branch 分支名 指定对象的hash值
# 切换分支
git checkout 分支名
# 新建分支并且切换过去
git checkout -b 分支名
# 删除空的或已被合并分支
git branch -d 分支名
# 强制删除分支
git branch -D 分支名
# 合并分支
# 1.快进合并（fast-forward），不会产生冲突
# 2.典型合并，会产生冲突，进入文件，解决冲突，git commit
git merge 分支名
```

### git 存储

```bash
# 将修改未完成的分支保存到栈上
git stash
# 查看栈储存
git stash list
# 应用指定栈
git stash apply 栈名
# 移除指定栈
git stash drop 栈名
# 应用并移除指定栈（git stash apply + git stash drop）
git stash pop 栈名
```

### git 撤销

```bash
# 将工作目录的文件撤销
git restore 文件名
# 将暂存区的文件撤销到工作区
git restore --staged 文件名
# 撤回自己的提交（注释写错了，只是覆盖提交，没有撤回提交）
git commit amend
```

### git 打 tag

```bash
# 列出标签
git tag
# 打tag
git tag tag名
# 查看标签
git tag show tag名
# 删除标签
git tag -d 标签名
# head指向某个版本的tag，这时要修改往往需要创建新的分支
git checkout tag名
git branch -b 分支名
```

### git 远程仓库

#### 正常的数据推送 和 拉取步骤

1. 确保本地分支已经跟踪了远程跟踪分支
2. 拉取数据 : `git pull`
3. 上传数据: `git push`

#### 一个本地分支怎么去跟踪一个远程跟踪分支

1. 当克隆的时候 会自动生成一个 master 本地分支(已经跟踪了对应的远程跟踪分支)
2. 在新建其他分支时 可以指定想要跟踪的远程跟踪分支
   `git checkout -b 本地分支名 远程跟踪分支名`
   `git checkout --track 远程跟踪分支名`
3. 将一个已经存在的本地分支 改成 一个跟踪分支
   `git branch -u 远程跟踪分支名`

```bash
# 为远程仓库配置别名&用户信息
git remote add 别名 URL
# 显示远程仓库别名和URL
git remote -v
# 将本地项目推送到远程仓库
git push 别名 分支名
# 将远程仓库克隆到本地（默认分支名为origin,-o 配置项可以指定分支名）
git clone url
# 更新修改
git fetch 别名（将修改同步到远程跟踪分支上）
git merge 远程跟踪分支
# 查看所有分支及跟踪分支
git branch -vv
# 设置本地分支跟踪远程分支（--set-upstream-to）
git branch -u 远程跟踪分支
# 从远程库拉取文件前,提前设置本地分支跟踪远程分支
git pull
```

---

## linux 常用命令

```bash
# 清屏
clear
# 往控制台输出信息（创建一个test.txt文件，并写入“test content”）
echo "test content" > test.txt
# 将当前目录下的子文件&子目录平铺在控制台
ll
# 将对应目录下的子孙文件&子孙目录平铺在控制台
find 目录名
# 将对应目录下的文件平铺在控制台
find 目录名 -type f
# 删除文件
rm 文件名
# 重命名
mv 源文件 重命名文件
# 查看对应文件内容
cat 文件的url
# 修改文件
vim 文件的url（在英文模式下）
	按 i 进入插入模式，进行文件编辑
	按esc & ： 进行命令的执行
		q! 强制退出，不保存
		wq 保存退出
		set nu 设置行号
```

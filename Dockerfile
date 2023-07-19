# 使用Node.js作为基础镜像
FROM node

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json文件到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用程序的源代码到工作目录
COPY . .

# 暴露应用程序的端口
EXPOSE 3000

# 启动应用程序
CMD ["npm", "run", "start:prod"]

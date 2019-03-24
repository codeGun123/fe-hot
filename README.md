# fe-hot

nextjs 先解决问题再优化

## 坑

#### 1. 解决 antd less 模块化问题

        https://www.yuque.com/steven-kkr5g/aza/ig3x9w

#### 2. antd 组件产生 body 下 div 其 position=absolute 导致无法继续操作问题

       强制 position=static

#### 3. classnames 组合 css-modules 用法

        https://www.npmjs.com/package/classnames

        import classNames from 'classnames/bind';
        import styles from './index.less'; //  fz16, pointer

        let cx = classNames.bind(styles);

        <button className={cx('fz16', 'pointer')}>{text}</button>

## 项目规范：

1. 需要缓存的信息，必须使用 util/storage.js 中的方法
2. 所有图片都必须先压缩后使用 [https://tinypng.com/](https://tinypng.com/)

## 项目配置

1.  启动:

        开发环境: npm run dev
        线上环境: npm start

2.

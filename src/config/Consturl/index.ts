// const prePath = '/sl';
const prePath = 'https://yuudachi.cn:444/';
// 请求时的URL设置
let CONSTURL = {
    // 获取所有文章的基础信息
    GET_ALL_ARTICLE : `${prePath}articles?pn=`,
    // 获取部分文章信息
    GET_ARTICLES_BY_PARAMS : `${prePath}article`,
    // 根据ID获取文章详细信息
    GET_ARTICLE_BY_ID : `${prePath}article/`,
    // 获取Banner栏
    GET_ALL_BANNERS : `${prePath}banners`,
    // 获取Banner栏
    COMMENT_OPERATION : `${prePath}comment`,
    // 获取友链信息
    FRIEND_LINK_INFOS : `${prePath}linkInfos`,
    // 获取评论
    GET_ALL_COMMENTS : `${prePath}comments`,
    // 评论操作
    COMMENTS_OPERATION : `${prePath}comment`,
    // 资源前缀
    SOURCE_PRE : "https://yuudachi.cn:444/static/images/article/",
}

export default CONSTURL;
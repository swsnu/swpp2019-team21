import React from 'react';

class KakaoLinkBtn extends React.Component {
    componentDidMount() {
        window.Kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: this.props.article.title,
                description: this.props.article.subtitle,
                imageUrl: `https://localhost:3000${this.props.article.thumbnail}`,
                link: {
                    mobileWebUrl: this.props.unique_link,
                    webUrl: this.props.unique_link
                }
            },
            buttons: [
                {
                    title: '자세히 보기',
                    link: {
                        mobileWebUrl: this.props.unique_link,
                        webUrl: this.props.unique_link
                    }
                }
            ]
        });
        console.log(`https://localhost:3000${this.props.article.thumbnail}`);
    }

    render() {
        return (
            <a id="kakao-link-btn">
                <div
                    className="kakao-share-btn share-btn"
                    data-tooltip-text="카카오톡 공유하기">
                    <img
                        id="kakao-share-icon"
                        src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
                    />
                </div>
            </a>
        );
    }
}

export default KakaoLinkBtn;

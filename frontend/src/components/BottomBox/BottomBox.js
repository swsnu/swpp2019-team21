import React, { Component, Profiler } from 'react';
import {
    Navbar,
    Image,
    OverlayTrigger,
    Popover,
    ListGroup
} from 'react-bootstrap';
import './BottomBox.css';

const mockInfoContent = {
    title: 'Welcome to Adit!',
    content:
        '국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다. 국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다. 행정각부의 장은 국무위원 중에서 국무총리의 제청으로 대통령이 임명한다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다. 감사원은 세입·세출의 결산을 매년 검사하여 대통령과 차년도국회에 그 결과를 보고하여야 한다. 국회는 선전포고, 국군의 외국에의 파견 또는 외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다.'
};

class BottomBox extends Component {
    state = { title: mockInfoContent.title, content: mockInfoContent.content };

    render() {
        return (
            <div className="BottomBox">
                <div className="InfoParagraph">
                    <div className="InfoTitle">{this.state.title}</div>
                    <div className="InfoContent">{this.state.content}</div>
                </div>
            </div>
        );
    }
}

export default BottomBox;

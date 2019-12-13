import React from 'react';
import ArticleEdit from './ArticleEdit';
import { history } from '../../../store';
import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../../test/utils/mockStore';
import { adpostActions, adreceptionActions } from '../../../store/actions';

const stubInitialStateLoading = {
    adpost_detailed_item: {
        tags: [('acc', 'cur', 'i')],
        title: '',
        subtitle: '',
        content: '',
        thumbnail: 'mockimage.jpg',
        image: [],
        is_owner: true,
        open_for_all: false
    },
    is_loading: true,
    views: 0,
    unique_link: 'test',
    is_participated: true,
};

const stubInitialState = {
    adpost_detailed_item: {
        tags: [('acc', 'cur', 'i')],
    },
    is_loading: false,
    views: 0,
    unique_link: 'test',
    is_participated: true,
    is_owner: true
};
const mockStore = getMockStore(stubInitialState);
const mockStoreLoading = getMockStore(stubInitialStateLoading);

describe('<ArticleEdit />', () => {
    let articledetail, articledetail_loading, mockAdpostGet, mockAdpostPut, spyHistoryPush;

    const props = {
        match: { params: { id: '0' } },
        history: history
    };
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('updated', 'false');
        localStorage.setItem('logged_in', 'true');
        articledetail = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ArticleEdit {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        articledetail_loading = (
            <Provider store={mockStoreLoading}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <ArticleEdit {...props} />}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        mockAdpostGet = jest
            .spyOn(adpostActions, 'getAdpost')
            .mockImplementation(id => {
                return dispatch => null;
            });
        mockAdpostPut = jest
            .spyOn(adpostActions, 'putAdpost')
            .mockImplementation((id, adpost) => {
                return dispatch => null;
            });
        spyHistoryPush = jest
            .spyOn(history, 'push')
            .mockImplementation(() => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render without errors', () => {
        const component = mount(articledetail);
        const wrapper = component.find('ArticleEdit');
        expect(wrapper.length).toBe(1);
    });

    it('should render without errors(loading)', () => {
        const component = mount(articledetail_loading);
        const wrapper = component.find('ArticleEdit');
        expect(wrapper.length).toBe(1);
    });

    it('should allow to change contents', ()=> {
        const component = mount(articledetail_loading);
        const wrapper = component.find('.form-control');
        let mocked = jest.fn()
        const mockReader = {
            onloadend: mocked,
            readyState: 2,
            readAsDataURL: mocked,
            result: "TEST_RESULT,TEST_RESULT"
        }
        mockReader.readAsDataURL = jest.fn(() => {
            return mockReader.onloadend()
        });
        window.FileReader = jest.fn(() => {
            return mockReader
        });
        wrapper.at(0).simulate('change', {
            target: {value:'test_title'}
        })
        wrapper.at(0).simulate('change', {
            target: {value:'test_title'}
        })
        wrapper.at(1).simulate('change', {
            target: {value:'test_subtitle'}
        })
        wrapper.at(2).simulate('change', {
            target: {value:'test_explain'}
        })
        const file = new File(['file contents'],'TEST_FILE.png',{type:'image/png'});
        wrapper.at(3).simulate('change', {
            target: {files:[file]}
        })
        const wrapper2 = component.find('#next-button');
        wrapper2.simulate('click');
    })

    it('should not allow contents over certain lengths', () => {
        window.alert = jest.fn()
        const component = mount(articledetail_loading);
        const wrapper = component.find('.form-control')
        wrapper.at(0).simulate('change', {
            target: {value:'0000000000000000000000000000000'}
        });
        wrapper.at(1).simulate('change', {
            target: {value:'0000000000000000000000000000000'}
        });
        var str = '0'
        for(var i=0; i<10000; i++) {
            str+='0'
        }
        wrapper.at(2).simulate('change', {
            target: {value:str}
        });
        expect(window.alert).toHaveBeenCalledTimes(3);
    })

    it('should not allow blank input and invalid format', ()=> {
        window.alert = jest.fn()
        let mocked = jest.fn()
        const mockReader = {
            onloadend: mocked,
            readyState: 2,
            readAsDataURL: mocked,
            result: "TEST_RESULT,TEST_RESULT"
        }
        mockReader.readAsDataURL = jest.fn(() => {
            return mockReader.onloadend()
        });
        window.FileReader = jest.fn(() => {
            return mockReader
        });
        const component = mount(articledetail_loading);
        const wrapper = component.find('.form-control');
        const wrapper2 = component.find('#next-button');
        wrapper2.simulate('click');
        wrapper.at(0).simulate('change', {
            target: {value:'test_title'}
        });
        wrapper.at(0).simulate('change', {
            target: {value:'test_title'}
        });
        wrapper2.simulate('click');
        wrapper.at(1).simulate('change', {
            target: {value:'test_subtitle'}
        });
        wrapper2.simulate('click');
        wrapper.at(2).simulate('change', {
            target: {value:'test_explain'}
        });
        const file = new File(['file contents'],'TEST_FILE.abc',{type:'image/abc'});
        wrapper.at(3).simulate('change', {
            target: {files:[file]}
        })
        wrapper2.simulate('click');
        expect(window.alert).toHaveBeenCalledTimes(4);
    })
});

import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, within, getAllByRole, getByRole} from '@testing-library/react'
import '@testing-library/jest-dom'
import OrderListPage from "./OrderListPage";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get('http://13.209.35.46/orders', (req, res, ctx) => {
    return res(ctx.json(  [{
      "id": 1,
      "customerId": 7,
      "address1": "서울시 강남구 강남대로 112길",
      "address2": "그린빌딩 110호",
      "totalPrice": 20000,
      "createdAt": "2022-07-20T04:32:24.027Z"
    }, {
        "id": 2,
        "customerId": 5,
        "address1": "서울시 강남구",
        "address2": "그린빌딩",
        "totalPrice": 222222,
        "createdAt": "2022-08-20T11:09:27.061Z"
      },
      {
        "id": 3,
        "customerId": 3,
        "address1": "경기도 가평군 청평면 신청평로",
        "address2": "32",
        "totalPrice": 1500000,
        "createdAt": "2022-08-20T11:17:07.000Z"
      },
    ]))
  }),

  rest.post('http://13.209.35.46/orders', (req, res, ctx) => {
    return res(ctx.json({
      "id": 4,
      "customerId": 4,
      "address1": "경기도 가평군 청평면 신청평로",
      "address2": "32",
      "totalPrice": 46000,
      "createdAt": "2022-08-20T11:18:58.377Z"
    }))
  }),

  rest.get('http://13.209.35.46/users', (req, res, ctx) => {
    return res(ctx.json([
      {
        "id": 1,
        "name": "도선재",
        "createdAt": "2022-07-20T04:26:29.613Z"
      },
    {
      "id": 2,
      "name": "피예인",
      "createdAt": "2022-07-20T04:26:30.511Z"
    },
    {
      "id": 3,
      "name": "진규형",
      "createdAt": "2022-07-20T04:26:31.154Z"
    },
    {
      "id": 4,
      "name": "기기선",
      "createdAt": "2022-07-20T04:26:31.748Z"
    },
    {
      "id": 5,
      "name": "길유한",
      "createdAt": "2022-07-20T04:26:32.389Z"
    },
    {
      "id": 6,
      "name": "선상율",
      "createdAt": "2022-07-20T04:26:32.988Z"
    },
    {
      "id": 7,
      "name": "인유완",
      "createdAt": "2022-07-20T04:26:33.641Z"
    },
    {
      "id": 8,
      "name": "조승희",
      "createdAt": "2022-07-20T04:26:34.253Z"
    },
    {
      "id": 9,
      "name": "추준솔",
      "createdAt": "2022-07-20T04:26:34.921Z"
    },
    {
      "id": 10,
      "name": "김기준",
      "createdAt": "2022-07-20T04:26:35.621Z"
    }
  ]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('주문정보가 로드되고 테이블에 주문리스트가 3개 표시된다.', async ()=> {
  render(<BrowserRouter><OrderListPage /></BrowserRouter>)

  const list = await screen.findByText(/경기도 가평군/);
  const items = screen.getAllByRole("listItem");
  expect(items.length).toBe(3);

});


test('모달창에서 주문정보를 추가한다.', async () => {
  render(<BrowserRouter><OrderListPage /></BrowserRouter>);

  await screen.findAllByRole("listItem");
  const orderIdList = screen.getAllByRole("listItem").map((item) => ({id: within(item).getByRole('orderId').textContent as string}));
  expect(orderIdList.find((order) => order.id === '4')).toBeFalsy();

  fireEvent.click(screen.getByRole('orderButton'))
  expect(screen.getByRole("postOrderModal")).toBeInTheDocument()

  fireEvent.change(screen.getByTestId('my-address'), { target : {value : '경기도 가평군 청평면 신청평로'}})
  fireEvent.change(screen.getByTestId('my-detail-address'), { target : {value : '32'}})
  fireEvent.change(screen.getByTestId('my-total-price'), { target : {value : 46000}})

  fireEvent.mouseDown(screen.getByRole('button'));
  const optionList = within(screen.getByRole('listbox'));
  fireEvent.click(optionList.getByText(/길유한/i));
  fireEvent.click(screen.getByRole('postButton'));


  console.log(orderIdList);

})
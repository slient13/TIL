# 개요
html 요소 *table*을 *wrapping*한 컴포넌트. table의 기본적인 기능은 물론 복잡한 header 구조나, *summary* 등 유용한 기능들을 복합적으로 제공한다.

# 기본 구조
```jsx
const colums = [
	{
		title: 'title', // 행의 제목
		dataIndex: 'dIndex', // 해당 행에 어떤 값을 매핑할지 결정 (키값으로 매핑)
		key: 'key', // `동일한 `dataIndex`를 이용해 여러 column 구성할 때 
					// 서로 다른 column을 구분하기 위해 사용
		render: (value, record, index) => (string | React.ReactNode)
					// 데이터를 그대로 표시하지 않고 가공해서 보여줄 때 사용.
					// 행마다 버튼을 만들거나 record 내 소개용 등으로 사용 가능.
	}
]

<Table
	title={() => string | React.ReactNode} // 좌상단에 제목이 생김. 
	extra={() => string | React.ReactNode} // 우상단에 추가 요소
					// 특수한 기능 등을 추가할 때 사용.
	columns={columns} // 테이블의 행을 정의한 것.
	dataSource={dataSource} // 테이블에 표시할 데이터 목록.
	bordered // 기본값 생략 -> 수직 경계 없음.
	scroll={{...}} // 테이블의 크기 등을 제한하고 대신 스크롤을 생성
	summary={(dataObjectList) => <Table.Summary/>} // 집계
/>
```

참고: (ref:: [Table - Ant Design](https://ant.design/components/table))
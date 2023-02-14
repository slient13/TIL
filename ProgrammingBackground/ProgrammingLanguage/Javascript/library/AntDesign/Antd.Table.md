# 개요
html 요소 *table*을 *wrapping*한 컴포넌트. table의 기본적인 기능은 물론 복잡한 header 구조나, *summary* 등 유용한 기능들을 복합적으로 제공한다.

# 기본 구조
```jsx
const colums = [
	{
		title: 'title', // 행의 제목
		dataIndex: 'dIndex', // 해당 행에 어떤 값을 매핑할지 결정
		
	}
]

<Table
	columns={columns} // 테이블의 행을 정의한 것.
	dataSource={dataSource} // 테이블에 표시할 데이터 목록.
	bordered // 기본값 생략 -> 수직 경계 없음.
	scroll={{...}} // 테이블의 크기 등을 제한하고 대신 스크롤을 생성
	summary={(dataObjectList) => <Table.Summary/>} // 집계
/>
```

참고: (ref:: [Table - Ant Design](https://ant.design/components/table))
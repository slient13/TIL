# 개요
[Java](../../Java.md) 환경에서 제공되는 [ORM](../../../Database/ORM.md) 중 하나로 [JPA](JPA.md)를 구현한 구현체 중 하나이다.

# 초기 설정
참고 자료: (ref:: [Hibernate : 설정하기](https://kogle.tistory.com/32))

## pom.xml에 dependency 추가
```xml
<dependency>
	<groupId>org.hibernate</groupId>
	<artifactId>hibernate-core</artifactId>
	<version><!--본인의 상황에 맞는 버전 입력--></version>
</dependency>
```

사용하는 java 버전에 따라 다른 버전을 지정해야 하는데 지원되는 버전의 범주는 아래 문서에서 확인할 수 있다.
- (ref:: [Releases - Hibernate ORM](https://hibernate.org/orm/releases/))

## hibernate configuration 설정
```xml
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>

  <session-factory>

    <!-- JDBC Database connection settings -->
      <property name="connection.driver_class"><!--DB용 driver--></property>
      <property name="connection.url"><!--DB에 접속하기 위한 URL--></property>
      <property name="connection.username"><!--접근용 id--></property>
      <property name="connection.password"><!--접근용 pw--></property>

    <!-- JDBC connection pool settings ... using built-in test pool -->
      <property name="connection.pool_size">1</property>

    <!-- Select our SQL dialect -->
      <property name="dialect"><!-- 사용하는 DB에 대한 dialect --></property>

    <!-- Echo the SQL to stdout -->
      <property name="show_sql">true</property>

    <!-- Set the current session context -->
      <property name="current_session_context_class">thread</property>

  </session-factory>

</hibernate-configuration>
```

*h2 DB를 이용한 예시*
```xml
<!DOCTYPE hibernate-configuration PUBLIC  
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"  
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">  
<hibernate-configuration>  
    <session-factory>  
        <!-- JDBC Database connection settings -->  
        <property name="connection.driver_class">org.h2.Driver</property>  
        <property name="connection.url">jdbc:h2:tcp://localhost/~/test</property>  
        <property name="connection.username">sa</property>  
        <property name="connection.password"></property>  
  
        <!-- JDBC connection pool settings ... using built-in test pool -->  
        <property name="connection.pool_size">1</property>  
  
        <!-- Select our SQL dialect -->  
        <property name="dialect">org.hibernate.dialect.H2Dialect</property>  
  
        <!-- Echo the SQL to stdout -->  
        <property name="show_sql">true</property>  
  
        <!-- Set the current session context -->  
        <property name="current_session_context_class">thread</property>  
        <mapping class="com.example.h2.Person"/>  
    </session-factory>  
</hibernate-configuration>
```

DB별 dialect의 목록은 다음 링크 참고 (ref:: [Hibernate - SQL Dialects - GeeksforGeeks](https://www.geeksforgeeks.org/hibernate-sql-dialects/))

## 테이블 매핑

## query
참고: (ref:: [Hibernate - Query Language (tutorialspoint.com)](https://www.tutorialspoint.com/hibernate/hibernate_query_language.htm))

`session.createQuery(query: String)`를 이용한다. 해당 함수를 실행하면 쿼리가 실행된다. 쿼리 문법은 SQL 기반의 독자적인 방언인 HQL을 이용한다. (ref:: [HQL](https://docs.jboss.org/hibernate/orm/3.3/reference/ko-KR/html/queryhql.html)) 참고


# 참고 자료
- (ref:: [Learn Hibernate Tutorial - javatpoint](https://www.javatpoint.com/hibernate-tutorial))
**Model View Controller**

애플리케이션을 구성할 때 그 구성 요소를 **Model, View, Controller**로 역할에 따라 구분한 패턴. 이를 통해 **UI**에서 비즈니스 로직을 분리하여 서로 영향 없이 고칠 수 있도록 제공한다.

`Java`를 통한 앱 개발 시 주로 사용된다.

# 구성
## Model
실제 DB와 연동하여 데이터를 조회하거나 수정하는 기능을 하는 구성 요소.  [[#DAO]]와 [[#DTO]]를 가진다.

### DAO
Data Access Object. 애플리케이션이 DB와 통신하려면 특정한 방법을 통해야 하는데, 이 방법을 제공하여 DB와의 통신을 추상화해주는 객체.

### DTO
Data Transfer Object. 애플리케이션과 DB가 서로 데이터를 주고받을 수 있도록 양쪽에서 해석 가능한 형태로 가공된 데이터 객체.

## View
**UI**. 사용자는 이를 통해 정보를 취하거나 [Controller](#Controller)를 향해 특정 요청을 전달할 수 있다.

## Controller
[View](#View)와 [Model](#Model) 사이에 끼어서 원활한 소통을 할 수 있도록 지원하고 그 둘을 서로 분리해주는 구성 요소.

사용자가 [View](#View)를 통해 요청을 해오면 요청에 따라 적절한 로직을 거쳐 [Model](#Model)에 데이터의 조회 혹은 수정을 요청하고, 그에 따른 응답을 받아 [View](#View)로 반환하여 사용자 화면을 갱신할 수 있도록 해준다.
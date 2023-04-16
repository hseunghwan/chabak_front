### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

`yarn add @mui/material @emotion/react @emotion/styled`
`yarn add @mui/icons-material`

---

# 컴포넌트 계층 구조

-   App
    -   BackgroundContainer
        -   Home
            -   ChatSpeechBubble
                -   ChatWindow
                    -   ChatMessages
            -   MapSpeechBubble
                -   Map
            -   HomeContainer
                -   HomeContents
                    -   AppToolbar
                    -   HomeContentBox
                -   PlaceDetail
                    -   PlaceDetailForm
                -   UserDetail
                    -   UserDetailForm
                -   RegisteredPlace
                    -   RegisteredPlaceForm
            -   Search
                -   Searchbar
                -   Results
                    -   ResultBox
            -   Filter
                -   FilterBox
                -   Results
                    -   ResultBox
        -   MyPage ~~ Login only ~~
            -   MyPageContents
        -   RegisterPlace
            -   Map
            -   RegisterPlaceForm
                -   PlaceImageInput
                -   PlaceInfoInput
        -   SignUp ~~ Logout only ~~
            -   SignUpForm
                -   SignUpInput
        -   LogIn
            -   LogInInForm
                -   LogInInput

# 라우팅 구조

-   Home ("/")
-   PlaceDetail ("/place/:id")
-   UserDetail ("/user/:id")
-   Registeredplace ("/Registeredplace/:id")
-   Search ("/search")
-   Filter ("/filter")
-   MyPage ("/mypage")
-   RegisterPlace ("/registerplace")
-   SignUp ("/signup")
-   LogIn ("/login")

# 상태 관리 구조

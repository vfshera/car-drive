module.exports = {
    purge: ["./resources/**/*.blade.php", "./resources/**/*.js"],
    darkMode: false,
    theme: {
        extend: {
            spacing: {
                "5/100": "5%",
                "10/100": "10%",
                "15/100": "15%",
                "20/100": "20%",
                "22/100": "22%",
                "30/100": "30%",
                "35/100": "35%",
                "45/100": "45%",
                "55/100": "55%",
                "65/100": "65%",
                "75/100": "75%",
                "85/100": "85%",
                "95/100": "95%",
            },
            colors: {
                brand: {
                    1: "#14213d",
                    2: "#fca311",
                    3: "#e5e5e5",
                },
            },
            minHeight: {
                0: "0",
                "1/4vh": "25vh",
                "1/2vh": "50vh",
                "2/3vh": "60vh",
                "3/4vh": "75vh",
                "4/5vh": "80vh",
                100: "100px",
                150: "150px",
                200: "200px",
                280: "280px",
                300: "300px",
                400: "400px",
                "app-screen": "calc(100vh - 4rem)",
                
            },
            height: {
                100: "100px",
                150: "150px",
                200: "200px",
                300: "300px",
                400: "400px",

                "1/4vh": "25vh",
                "1/2vh": "50vh",
                "2/3vh": "60vh",
                "3/4vh": "75vh",
                "4/5vh": "80vh",
                appFull: "calc(100vh - 4rem)",
                full: "100%",
            },
        },
    },
    variants: {
        extend: {
            borderRadius: ["hover", "focus"],
            fontSize: ["hover", "focus"],
        },
    },
    plugins: [],
};

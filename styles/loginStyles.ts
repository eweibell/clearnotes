import { StyleSheet } from "react-native"

export const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "3vh",
        paddingBottom: "15vh",
    },
    title: {
        fontSize: "5vh",
        lineHeight: "7.5vh",
        fontWeight: "bold",
        marginBottom: "5vh",
    },
    input: {
        width: "70vw",
        marginBottom: "1.5vh",
        padding: "0.5vh",
        borderWidth: "1.5px",
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: "2.5px"
    },
    button: {
        width: "70vw",
        marginBottom: "1.5vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0.5vh",
        borderWidth: "1.5px",
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: "2.5px"

    }
});

export default LoginStyles;
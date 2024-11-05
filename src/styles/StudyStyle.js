import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d9d9d9",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    exit: {
        position: "absolute",
        top: 10,
        left: 10
    },
    text: {
        textAlign: "center",
        fontSize: 24,
        color: "#000"
    },
    skip: {
        textAlign: "center",
        fontSize: 24,
        color: "red"
    },
    result: {
        fontSize: 24,
        color: "green",
        textAlign: "center"
    },
    listen: {
        width: 50,
        height: 50,
        borderRadius: 100,
        padding: 10,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    },
    box: {
        width: 150,
        height: 150,
        borderRadius: 100,
        padding: 10,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    },
    btnSkip: {
        position: "absolute",
        bottom: 30,
        left: 30
    },
    btnNext: {
        position: "absolute",
        bottom: 30,
        right: 30
    }
})
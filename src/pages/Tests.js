import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-paper";
import { UserAuth } from "../component/AuthContext";
import { dataURL } from "../component/APIPort";

const Tests = ({navigation}) => {
    const [tests, setTests] = useState([]);
    const {user} = UserAuth();
    const [processes, setProcesses] = useState([]);
    useEffect(()=> {
        axios.get(dataURL + "tests")
        .then(response => {
            const values = response.data.splice(1);
            setTests(values);
            if (user.processes !== null){
                setProcesses(user.processes.filter(p => p.type.includes("test")))
            }
        }).catch(e=>console.log(e))
    },[user])
    return (
        <View style={styles.container}>
            <FlatList 
                data={tests} 
                renderItem={({item})=>{
                    var lessonProgress = undefined
                    if (processes) {
                        lessonProgress = processes.find(p => p.type.includes(item.id))
                    }
                    return (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={styles.text} variant="titleLarge">{item.name}</Text>
                        </Card.Content>
                        <Card.Content style={styles.progress}>
                            <Text style={styles.textprogress}>Point: {lessonProgress!==undefined?lessonProgress.progress:0}</Text>
                            <Button mode="contained" buttonColor="#1976d2" style={styles.button} onPress={()=>navigation.navigate("Test", {testId: item.id, type: "test"+item.id })}>Start</Button>
                        </Card.Content>                        
                    </Card>
                    )}
                }
                />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d9d9d9",
        paddingTop: 10
    },
    text: {
        color: "#000",
        fontSize: 16
    },
    card: {
        margin: 16
    },
    button: {
        width: 100
    },
    textprogress:{
        fontSize: 20,
        color: "#000",
        fontWeight: "bold"
    },
    progress: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    }
})
export default Tests;
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, ProgressBar, Button } from "react-native-paper";
import { UserAuth } from "../component/AuthContext";

const Lessons = ({navigation, route}) => {
    const [lessons, setLessons] = useState([]);
    const {user} = UserAuth();
    const {type} = route.params;
    const [processes, setProcesses] = useState([]);
    useEffect(()=> {
        axios.get("http://34.136.63.21/api/lessons")
        .then(response => {
            setLessons(response.data);
            if (user.processes !== null){
                setProcesses(user.processes.filter(p => p.type.includes(type)))
            }
        }).catch(e=>console.log(e))
    },[user])
    return (
        <View style={styles.container}>
            <FlatList 
                data={lessons} 
                renderItem={({item, index})=>{
                    var lessonProgress = undefined
                    if (processes){
                        lessonProgress = processes.find(p => p.lessonId === item.id)
                    }
                    return (
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text style={styles.text} variant="titleLarge">Lesson {index+1}: {item.name}</Text>
                                <ProgressBar progress={lessonProgress!==undefined?(lessonProgress.progress/100):0} color="green" style={{marginTop: 20}} />
                            </Card.Content>
                            <Card.Content style={styles.progress}>
                                <Text style={styles.textprogress}>{lessonProgress!==undefined?lessonProgress.progress:0}%</Text>
                                <Button mode="contained" buttonColor="#1976d2" style={styles.button} onPress={()=>navigation.navigate("Study", {lesson:item, type: type})}>Start</Button>
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
        backgroundColor: "#d9d9d9"
    },
    text: {
        color: "#000",
        fontSize: 16
    },
    card: {
        margin: 10 
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
export default Lessons;
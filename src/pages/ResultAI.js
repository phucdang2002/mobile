import { FlatList, SafeAreaView, StyleSheet } from "react-native"
import { Button, Text } from "react-native-paper"
import { UserAuth } from "../component/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import axios from "axios";
import { styles } from "../styles/ResultStyle";
import { dataURL } from "../component/APIPort";

const ResultAI = ({navigation, route}) => {
    const {correct, results, noOfWords, difficulty} = route.params;
    const {user, updateResult} = UserAuth();
    const handleGoBack = async (e) => {
        e.preventDefault();
        if (difficulty) {
            const process = {
                userUID: user.uid,
                lessonId: 0,
                progress: correct * 10,
                type: difficulty
            }
            axios.post(dataURL + "processes", process)
                .then(async (response) => {
                    console.log(response.data);
                    await updateResult();
            })
        }
        showTabBar();
        navigation.navigate("AI")
    }
    const hideTabBar = () => {
        navigation.getParent()?.setOptions({ tabBarStyle: {display: "none"} });
    };
    const showTabBar = () => {
        navigation.getParent()?.setOptions({ tabBarStyle: {display: "flex"} });
    };
    useFocusEffect(
        useCallback(()=> {
            hideTabBar();
        },[navigation])
    )
    return(
        <SafeAreaView style={styles.container}>
            <Text variant="displayMedium">Result</Text>
            {difficulty&&<Text variant="titleLarge">You got {correct*10} points</Text>}
            <Text variant="titleMedium">{correct}/{noOfWords} correct answers</Text>
            <FlatList
                data={results}
                renderItem={({item})=>(
                    <Text style={styles.content} variant="bodyMedium">{item}</Text>
                )}
            />
            <Button textColor="#000" mode="outlined" onPress={handleGoBack}>Back</Button>
        </SafeAreaView>
    )
}

export default ResultAI
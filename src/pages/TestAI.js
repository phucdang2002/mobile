import { GoogleGenerativeAI } from "@google/generative-ai"
import { useEffect, useRef, useState } from "react"
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native"
import { ActivityIndicator, Button, Text } from "react-native-paper"

const genAI = new GoogleGenerativeAI("AIzaSyBDjVXQL5XbtXmThfbptEpqmMyKyIanxdw")
const TestAI = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState([])
    const isFirstRun = useRef(true);
    const {difficulty} = route.params;
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
    useEffect(()=> {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            async function generate() {
                const prompt = "Give me a list of 10 " + difficulty + " sentences in json format form [{id, content}] (don't contain ```json and ```)"
                const result = await model.generateContent(prompt);
                const response = result.response;
                const text = response.text();
                console.log(text);
                try {
                    setList(JSON.parse(text));
                    setIsLoading(false)
                } catch  {
                    generate();
                }
            }
            generate();
        }
    },[difficulty,model])
    return (
        <SafeAreaView style={styles.container}>
            {isLoading&&<ActivityIndicator style={styles.loading} size={100} color="#000"/>}
            {list && list.length > 0 && (
                <View style={{flex: 2}}>
                    <Text variant="headlineMedium" style={{marginBottom: 8}}>You will do the test with below sentences</Text>
                    <FlatList
                        data={list}
                        renderItem={({item})=>
                            <Text style={styles.content}>- {item.content}</Text>
                        }
                    />
                    <Button mode="contained" buttonColor="#4484E9" onPress={()=>navigation.navigate('StudyAI', {sentences: list, difficulty})}>Start</Button>
                </View>
            )}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16
    },
    button: {
        marginTop: 16
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#000"
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#000"
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    itemTextStyle: {
        fontSize: 16,
        color: "#000"
    },
    content: {
        fontSize: 16,
        padding: 4
    },
    loading: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default TestAI

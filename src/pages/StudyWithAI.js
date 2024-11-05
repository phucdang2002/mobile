import { useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native"
import { Dropdown } from "react-native-element-dropdown";
import { Button, Card, Text } from "react-native-paper"
import { UserAuth } from "../component/AuthContext";

const data = [
    { label: 'Easy', value: 'easy' },
    { label: 'Normal', value: 'normal' },
    { label: 'Hard', value: 'hard' },  
];
const StudyWithAI = ({navigation}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [point, setPoint] = useState(0)
    const {user} = UserAuth();
    const processes = user&&user.processes;

    const handleStart = () => {
        if (value!==null) {
            navigation.navigate("TestAI", {difficulty: value})
        }
        else {
            Alert.alert("You must choose a difficulty to start")
        }
    }
    return (
    <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
            <Card.Content>
                <Text variant="titleLarge">Practice with topics</Text>
            </Card.Content>
            <Card.Cover source={require("../../images/topic.jpg")} />
            <Card.Actions>
                <Button onPress={()=>navigation.navigate("Topic")}>Select</Button>
            </Card.Actions>
        </Card>
        <Card style={styles.card}>
            <Card.Content>
                <Text variant="titleLarge">Test with AI</Text>
            </Card.Content>
            <Card.Content>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={styles.itemTextStyle}
                    placeholder={!isFocus ? 'Select a difficulty' : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                        const checkpoint = processes.find(p=>p.type===item.value)
                        if (checkpoint)
                            setPoint(checkpoint.progress)
                        else {
                            setPoint(0)
                        }
                    }}
                />
                {value && <Text variant="titleLarge">Score: {point}</Text>}
            </Card.Content>
            <Card.Actions>
                <Button onPress={()=>handleStart()}>Start</Button>
            </Card.Actions>
        </Card>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d9d9d9",
        padding: 12
    },
    card: {
        margin: 10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
        marginTop: 16
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
    }
})
export default StudyWithAI

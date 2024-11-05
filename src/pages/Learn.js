import { StyleSheet, ScrollView, Alert, BackHandler } from "react-native";
import { Button, Card, Text } from "react-native-paper"
import { UserAuth } from "../component/AuthContext";
import { useEffect } from "react";
const Learn = ({navigation}) => {
    const {logOut} = UserAuth();
    useEffect(() => {
        const backAction = () => {
          Alert.alert(
            'Confirm Log out',
            'Are you sure you want to log out?',
            [
                { text: 'Yes', onPress: () => handleLogout() }, 
                {
                    text: 'No',
                    onPress: () => null, 
                    style: 'cancel',
                }
            ],
            { cancelable: false }
          );
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
    const handleLogout =async () => {
        await logOut();
        navigation.navigate("Login")
    }
    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge">Practice with words</Text>
                </Card.Content>
                <Card.Cover source={require("../../images/word.jpg")} />
                <Card.Actions>
                    <Button onPress={()=>navigation.navigate("Lesson", {type: "words"})}>Start</Button>
                </Card.Actions>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge">Practice with sentences</Text>
                </Card.Content>
                <Card.Cover source={require("../../images/sentence.png")} />
                <Card.Actions>
                    <Button onPress={()=>navigation.navigate("Lesson",{type: "sentences"})}>Start</Button>
                </Card.Actions>
            </Card>
        </ScrollView>
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
    }
})
export default Learn;
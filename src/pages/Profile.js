import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Avatar, Text } from "react-native-paper"
import { UserAuth } from "../component/AuthContext"

const Profile = ({navigation}) => {
    const {user, logOut} = UserAuth();
    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.avatar}>
            {user&&<Avatar.Image size={200} source={(user.avatar?{uri: user.avatar}:require("../../images/default.jpg"))}/>}
        </View>
        <View style={styles.info}>
            <Text variant="headlineSmall" style={styles.content}><Text style={{fontWeight: "700"}}>Name:</Text> {user&&user.name}</Text>
            <Text variant="headlineSmall" style={styles.content}><Text style={{fontWeight: "700"}}>Email:</Text> {user&&user.email}</Text>
            <Text variant="headlineSmall" style={styles.content}><Text style={{fontWeight: "700"}}>Level:</Text> {user&&user.level.type}</Text>
            <Text variant="headlineSmall" style={styles.content}><Text style={{fontWeight: "700"}}>Point:</Text> {user&&user.point}</Text>
            <TouchableOpacity style={styles.btnLogout} onPress={()=>logOut().then(()=>navigation.getParent().goBack())}><Text style={styles.txtLogout}>Log Out</Text></TouchableOpacity>
        </View>

    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e9e9e9",
        padding: 16
    },
    avatar: {
        flex: 1,
        backgroundColor: "#d9d9d9",
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
        flex: 1,
        justifyContent: "center"
    },
    content: {
        marginTop: 10,
        marginBottom: 10
    },
    btnLogout: {
        backgroundColor: "red",
        margin: 16,
        borderRadius: 16
    },
    txtLogout: {
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
        padding: 10
    }
})
export default Profile
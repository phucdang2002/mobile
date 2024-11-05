import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome"
import { UserAuth } from "../component/AuthContext";
import { useEffect, useState } from "react";

const Login = ({navigation}) => {
    const {googleSignIn, user, signInWithEmail} = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    useEffect(()=> {
        if (user) {
            navigation.navigate('UserScreen')
        }
    },[user])
    const handleSignIn = async () => {
        if (email!==""&&password!=="")
            await signInWithEmail(email, password)
        else {
            Alert.alert("Sign In Error","Email or Password is empty")
        }
      }
    const handleGoogleSignIn = async () => {
        await googleSignIn()
    }
    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.backgroundLogo}>
                    <Image source={require("../../images/logo.png")} style={styles.logo}/>
                </View>
                <View style={styles.slogan}>
                    <Text style={styles.text}>Speak with Confidence, Learn with Ease: Empowering English Fluency!</Text>
                </View>
                <View style={styles.fields}>
                    <TextInput label="Email" mode="outlined" activeOutlineColor="#4484E9" cursorColor="#000" onChangeText={setEmail}/>
                    <TextInput label="Password" secureTextEntry mode="outlined" activeOutlineColor="#4484E9" cursorColor="#000" onChangeText={setPassword}/>
                </View>
                <View style={styles.btns}>
                    <Button style={styles.btn} mode="elevated" textColor="#000" onPress={()=>handleSignIn()}>
                        Sign In
                    </Button>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <Text style={{color: "#000"}}>Or</Text>
                    <Button 
                        onPress={()=>handleGoogleSignIn()}
                        style={styles.btn} mode="outlined"
                        textColor="#000" 
                        icon={()=>(<Icon name="google" size={20} color="#000"/>)}
                    >
                        Sign in with Google
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d9d9d9",
    },
    backgroundLogo: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    slogan: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    fields:{
        flex: 1,
        paddingHorizontal: 20,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        color: "#000"
    },
    btns: {
        flex: 3,
        alignItems: "center"
    },
    btn: {
        width: 250,
        marginVertical: 10
    },
    logo: {
        width: 250,
        resizeMode: 'contain',
        marginVertical: 10
    }
})
export default Login;
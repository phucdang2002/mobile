import axios from "axios"
import { useEffect, useState } from "react"
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import { Avatar, Text } from "react-native-paper"

const Ranking = () => {
    const [users, setUsers] = useState([])
    useEffect(()=> {
        axios.get("http://34.136.63.21/api/auth")
        .then((response)=> {
            const values = 
            setUsers(response.data.filter((user)=>user.role===2).sort((a, b) => b.point - a.point))
        })
    },[])
    return(
        <SafeAreaView style={styles.container}>
            <Text variant="headlineLarge" style={styles.title}>Leaderboard</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text variant="labelLarge" style={{flex: 1}}>#</Text>
                    <Text variant="labelLarge" style={{flex: 2}}>Avatar</Text>
                    <Text variant="labelLarge" style={{flex: 5}}>Name</Text>
                    <Text variant="labelLarge" style={{flex: 1}}>Point</Text>
                </View>
            <FlatList
                data={users}
                renderItem={({index, item})=>(
                    <View style={styles.row}>
                        <Text variant="bodyLarge" style={{flex: 1}}>{index+1}</Text>
                        <View style={{flex: 2}}>
                            <Avatar.Image size={40} source={{uri: item.avatar}} />
                        </View>
                        <Text variant="bodyLarge" style={{flex: 5}}>{item.name}</Text>
                        <Text variant="bodyLarge" style={{flex: 1}}>{item.point}</Text>
                    </View>
                )}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    title: {
        textAlign: "center"
    },
    table: {
        padding: 10
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        padding: 10
    },
})
export default Ranking
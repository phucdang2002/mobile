import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu"
import { UserAuth } from "./AuthContext"
import { Avatar, Icon, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const SideAvatar = ({navigation}) => {
    const {user, logOut} = UserAuth();
    async function handleMenuSelect(navigation, option) {
        if (option==="Logout") {
            await logOut()
            navigation.goBack();
        }
      }
    return (
    <Menu onSelect={value => handleMenuSelect(navigation, value)}>
        <MenuTrigger>
            {user&&(<Avatar.Image style={{marginRight: 18}} size={36} source={(user.avatar?{uri: user.avatar}:require("../../images/default.jpg"))}/>)}
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.options}>
            <MenuOption value="Logout">
                <Text style={styles.text}><Icon source="exit-to-app" size={16} color="#ff1500" /> Log Out</Text>
            </MenuOption>
        </MenuOptions>
    </Menu>
  )
}
const styles = StyleSheet.create({
    options:{
        width: 110,
        padding: 10,
        marginLeft: -10,
        marginTop: 40
    },
    text:{
        color: "#ff1500",
        fontSize: 16
    }
})
export default SideAvatar

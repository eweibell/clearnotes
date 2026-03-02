import { Text, View, Image, Pressable } from "react-native";
import LoginStyles from "../styles/loginStyles.ts";
import {handleSignOut} from "../service/firebaseAuth.ts";

export default function Index() {
    return (
        <View style={{ flex: 1 }}>
            <Image source={require("../assets/images/clearnotes-logo2.png")}
                   style={{
                       width: "100%",
                       height: 300,
                       resizeMode: "cover"
                   }}
            />

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>Home</Text>
                <Pressable
                    style={LoginStyles.button}
                    onPress={handleSignOut}
                >
                    <Text style={LoginStyles.buttonText}>Sign out</Text>
                </Pressable>
            </View>
        </View>
    );
}

import { Text, View, Image, Pressable } from "react-native";
import { router } from "expo-router";

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
              alignItems: "center",
      }}
      >
          <Pressable
              onPress={() => router.push("/note")}
              style={{
                  width: 300,
                  height: 100,
                  borderColor: "#000",
                  borderRadius: 20,
                  backgroundColor: "#0081ff",
                  justifyContent: "center",
                  alignItems: "center",
          }}
          >
            <Text style={{ fontSize: 45, color: "white", fontFamily: "SigmarOne-Regular" }}>Get Started!</Text>
          </Pressable>
        </View>
    </View>
  );
}
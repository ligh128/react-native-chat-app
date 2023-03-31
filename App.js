import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { NativeBaseProvider, Box, HStack, VStack } from "native-base";
import { FontAwesome, Octicons } from "react-native-vector-icons";

const Chat = () => {
  const { width, height } = Dimensions.get("window");

  //ScrollViewRef using for scroll to the end of the chat in the scrollview component
  const scrollViewRef = useRef(null);
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  // State to store messages and input text
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  // Function to handle submit of message
  const handleSubmit = () => {
    // Check if input is not empty
    if (inputText.trim()) {
      // Add message to list of chat messages with current timestamp
      const sendTime = new Date();
      const newMessages = [
        ...messages,
        {
          text: inputText,
          time: `${sendTime.getHours()}:${sendTime.getMinutes()}`,
        },
      ];
      setMessages(newMessages);

      // Delay response message by 1 second
      setTimeout(() => {
        // Automatically generate response message saying "Message received" with current timestamp
        const responseText = "Message received";
        const responseTime = new Date();
        const responseMessage = {
          text: responseText,
          time: `${responseTime.getHours()}:${responseTime.getMinutes()}`,
        };
        setMessages([...newMessages, responseMessage]);
      }, 1000);

      // Reset input text
      setInputText("");
    }
  };
  return (
    <NativeBaseProvider>
      <Box bg="#FAFAFA" flex={1} alignItems="center">
        <Box
          bg="#FAFAFA"
          flex={1}
          justifyContent="space-between"
          paddingTop={20}
          paddingBottom={20}
          w={width >= 768 ? 768 : "100%"}
        >
          <Box overflow="hidden">
            <ScrollView
              style={{ height: 450 }}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              <VStack>
                {messages.map((message, index) => (
                  <HStack
                    key={index}
                    justifyContent="space-between"
                    alignItems="center"
                    borderRadius={8}
                    bg={message.text.includes("received") ? "white" : "#FAFAFA"}
                    p={4}
                  >
                    <FontAwesome
                      name="circle"
                      color={
                        message.text.includes("received")
                          ? "#9B7900"
                          : "#006D9B"
                      }
                      size={15}
                    />
                    <Text
                      fontSize="sm"
                      color={
                        message.text.includes("received") ? "white" : "black"
                      }
                      alignItems="center"
                      style={{ width: width >= 768 ? 600 : width - 150 }}
                    >
                      {message.text}
                    </Text>
                    <Text fontSize="xs" alignSelf="flex-end" color="gray.600">
                      {message.time}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </ScrollView>
          </Box>
          <Box
            borderColor="#DADADA"
            borderBottomLeftRadius={16}
            borderBottomRightRadius={16}
          >
            <HStack alignItems="center">
              <TextInput
                style={styles.textInput}
                value={inputText}
                placeholder=""
                onChangeText={(text) => setInputText(text)}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSubmit}
              >
                <Octicons name="paper-airplane" size={12} color="#8B8B8B" />
              </TouchableOpacity>
            </HStack>
          </Box>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};
// Styles object
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderColor: "#8B8B8B",
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 36,
  },
  sendButton: {
    position: "absolute",
    right: 0,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
});
export default Chat;

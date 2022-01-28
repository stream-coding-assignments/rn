import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Message {
  text: string;
  images?: string[];
}

class ChatClient {
  private messageCallback: ((message: Message) => void) | undefined;

  sendMessage(message: Message) {
    setTimeout(() => {
      if (this.messageCallback) {
        this.messageCallback(message);
      }
    }, 1000);
  }

  onMessageReceived(callback: (message: Message) => void) {
    this.messageCallback = callback;
  }

  disconnect() {
    this.messageCallback = undefined;
  }

  getAppSettings() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          // no tiff or bmp or heic
          allowedImageExtensions: ["gif", "png", "jpg"],
        });
      }, 400);
    });
  }
}

const HorizontalImageList = ({ images }: { images?: string[] }) => {
  if (!images || images.length === 0) return null;

  return (
    <View style={styles.selectedImagesList}>
      <FlatList
        data={images}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.selectedImageItem} />
        )}
      />
    </View>
  )
}
export default function App() {
  const [client] = useState(() => new ChatClient());
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImages(images => [...images, result.uri]);
    }
  };

  const clearInput = () => {
    setText('');
    setSelectedImages([]);
  };

  const sendMessage = () => {
    client.sendMessage({ text, images: selectedImages  });
    clearInput();
  }

  useEffect(() => {
    client.onMessageReceived((message) => {
      setMessages((messages) => [message, ...messages]);
    });
  }, [client]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          style={styles.list}
          inverted
          renderItem={({ item }) => (
            <View style={styles.message}>
              {!!item.text && <Text style={styles.messageText}>{item.text}</Text>}
              <HorizontalImageList images={item.images} />
            </View>
          )}
        />
        <HorizontalImageList images={selectedImages} />
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              style={styles.input}
              value={text}
              placeholder="Type a message..."
              onChangeText={setText}
            />
          </View>
          <Button
            title="attach"
            onPress={pickImage}
          ></Button>
          <Button
            title="send"
            onPress={sendMessage}
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    padding: 8,
  },
  input: {
    flex: 1,
  },
  list: {
    width: '100%',
  },
  message: {
    flex: 1,
    padding: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 4
  },
  messageText: {
    fontSize: 14,
  },
  selectedImagesList: {
    height: 100,
    width: '100%',
  },
  selectedImageItem: {
    width: 100,
    height: 100,
  },
  sendButton: {}
});

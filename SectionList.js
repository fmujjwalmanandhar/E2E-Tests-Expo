import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { palette } from "./palette";

const ListEmptyComponent = () => {
  return <ActivityIndicator color={palette.primary} size={"large"} />;
};

const MenuList = () => {
  const [productLists, setproductLists] = useState([]);
  const _onPress = (title) => () => {
    Alert.alert(`Did you tapped on ${title} ?`, undefined, [
      {
        text: "No",
        style: "destructive",
      },

      {
        text: "Yes",
        style: "default",
        onPress: () => {},
      },
    ]);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = [];

        data.forEach((item) => {
          /**checks for existing data */
          const existingCategory = formattedData?.find(
            (category) => category.title === item.category
          );
          if (existingCategory) {
            existingCategory.data.push(item);
          } else {
            formattedData.push({
              title: item.category,
              data: [item],
            });
          }
        });
        setproductLists(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SectionList
      sections={productLists}
      testID="sectionList"
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title} accessibilityLabel={item.title}>
            {item.title}
          </Text>
          <Image
            resizeMode="contain"
            resizeMethod="resize"
            style={styles.image}
            source={{
              uri: item.image,
            }}
          />
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Pressable
          testID={title}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? palette.primary : palette.secondary,
            },
            styles.button,
          ]}
          onPress={_onPress(title)}
        >
          <Text style={styles.header} accessibilityLabel={title}>
            {title}
          </Text>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    textTransform: "capitalize",
    backgroundColor: palette.white,
  },
  title: {
    fontSize: 20,
  },
  image: {
    height: 200,
    width: 300,
    borderRadius: 8,
  },
});

export default MenuList;

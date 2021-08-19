import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as SQLite from "expo-sqlite";
import * as FS from "expo-file-system";
import { Asset } from "expo-asset";

const styles = StyleSheet.create({
  ctnr: {
    flex: 1,
  },
  topCtnr: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    display: "flex",
  },
  livesCtnr: {
    flex: 1,
  },
  scoreCtnr: {
    flex: 1,
  },
  scoreText: {
    fontSize: 26,
  },
  coreCtnr: {
    flex: 2,
    justifyContent: "center",
    margin: 10,
  },
  btnCtnr: {
    flex: 1,
    justifyContent: "flex-end",
  },
  heart: {
    width: 40,
    height: 40,
  },
  question: {
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
  },
  choiceBtn: {
    padding: 20,
    backgroundColor: "#ccc",
    alignItems: "center",
    borderColor: "#666",
    borderWidth: 1,
  },
  choiceTxt: {
    fontSize: 30,
    color: "white",
  },
});

async function openDatabase() {
  const directory = FS.documentDirectory + "SQLite";
  if ((await FS.getInfoAsync(directory)).exists) {
    console.log("[+] Dossier SQLite existe");
  } else {
    console.log("[-] Dossier SQLite n'existe pas");
    await FS.makeDirectoryAsync(directory);
  }

  const dbFileUri = Asset.fromModule(require("../assets/db/VFApp.db")).uri;

  try {
    const info = await FS.getInfoAsync(`${directory}/VFApp.db`);
    console.log(info);
  } catch (e) {
    console.log(e);
  }

  try {
    await FS.downloadAsync(dbFileUri, `${directory}/VFApp.db`);
    console.log("[+] fichier copié sur FS du device");
  } catch (e) {}

  return SQLite.openDatabase("VFApp.db");
}

const Play = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const question = "Salut ça va ?";

  useEffect(() => {
    openDatabase().then((db) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Questions",
          null,
          (_, { rows: { _array } }) => {
            console.log(_array);
          },
          (_, error) => {
            console.log(error);
          }
        );
      });
    });
  }, []);

  return (
    <View style={styles.ctnr}>
      {/* Top bar */}
      <View style={styles.topCtnr}>
        {/* Score */}
        <View style={styles.scoreCtnr}>
          <Text style={{ fontSize: 26 }}>Score: {score}</Text>
        </View>
        {/* Vies */}
        <View style={styles.livesCtnr}>
          <View style={{ flexDirection: "row" }}>
            {Array(lives)
              .fill(null)
              .map((_, i) => (
                <Image
                  key={i}
                  source={require("../assets/heart.png")}
                  style={styles.heart}
                />
              ))}
          </View>
        </View>
      </View>
      {/* Question */}
      <View style={styles.coreCtnr}>
        <Text style={styles.question}>{question}</Text>
      </View>
      {/* Boutons  */}
      <View style={styles.btnCtnr}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => {}}>
              <View style={[styles.choiceBtn, { backgroundColor: "green" }]}>
                <Text style={styles.choiceTxt}>VRAI</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => {}}>
              <View style={[styles.choiceBtn, { backgroundColor: "red" }]}>
                <Text style={styles.choiceTxt}>FAUX</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Play;

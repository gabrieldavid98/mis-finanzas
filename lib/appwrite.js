import {
  Account,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.gd.misfinanzas",
  projectId: "6667afa300305015cbde",
  databaseId: "6667b5c50029695adf8d",
  userCollectionId: "6667b6370001b0c1d187",
  savingCollectionId: "66682fb4001ccefd3167",
  finatialCollectionId: "666e362300123070400d",
  movementsCollectionId: "6674ef92001ca9bf9e27",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    
    if (!newAccount) throw Error;

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        name: username,
      },
      []
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createSaving(saving) {
  try {
    const newSaving = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savingCollectionId,
      ID.unique(),
      saving,
      []
    )

    return newSaving
  } catch (error) {
    throw new Error(error)
  }
}

export async function getUserSavings(userId) {
  try {
    const savings = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savingCollectionId,
      [Query.equal("creator", userId)]
    );

    return savings.documents
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSavingById(id) {
  try {
    const saving = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savingCollectionId,
      id
    )

    return saving
  } catch (error) {
    throw new Error(error)
  }
}

export async function deleteSaving(id) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savingCollectionId,
      id
    )
  } catch (error) {
    throw new Error(error)
  }
}

export async function save(id, amount, dueAmount, saved) {
  try {
    if (amount === saved) {
      return
    }

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savingCollectionId,
      id,
      {saved: saved + dueAmount}
    )
  } catch (error) {
    throw new Error(error)
  }
}


export async function createFinancial(financial) {
  try {
    const newFinancial = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.finatialCollectionId,
      ID.unique(),
      financial,
      []
    )

    return newFinancial
  } catch (error) {
    throw new Error(error)
  }
}

export async function getUserFinacials(userId) {
  try {
    const financials = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.finatialCollectionId,
      [Query.equal("owner", userId)]
    );

    return financials.documents[0]
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateFinacials(financialsId, updatedFinancials) {
  try {
    const financials = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.finatialCollectionId,
      financialsId,
      updatedFinancials,
    );

    return financials
  } catch (error) {
    throw new Error(error);
  }
}

export async function createMovement(movement) {
  try {
    const newMovement = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.movementsCollectionId,
      ID.unique(),
      movement,
      []
    )

    return newMovement
  } catch (error) {
    throw new Error(error)
  }
}

export async function getUserMovements(userId) {
  try {
    const financials = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.movementsCollectionId,
      [Query.equal("owner", userId)]
    );

    return financials.documents
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteMovement(id) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.movementsCollectionId,
      id
    )
  } catch (error) {
    throw new Error(error)
  }
}
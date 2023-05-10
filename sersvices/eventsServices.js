//todo: move here all the services
export async function fetchUploadedFiles() {
  try {
    //get events list
    const res = await fetch(
      `https://v1.userbase.com/v1/admin/apps/${process.env.NEXT_PUBLIC_USERBASE_APP_ID}/users`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data.users;
    // console.log(data.users);
  } catch (error) {
    console.log(error);
  }
}

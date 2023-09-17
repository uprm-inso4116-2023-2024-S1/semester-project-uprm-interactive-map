using UnityEngine.UI;
using UnityEngine;

public class DbFetch : MonoBehaviour
{
    public void FetchEmail(string email)
    {
        GetComponent<Text>().text = (email);
    }

    private void Update() {
        if(Input.GetKeyDown(KeyCode.Space)){
            GetComponent<Text>().text = ("Space key was pressed.");
        }
    }
}

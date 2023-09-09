using System.Collections;
using System.Collections.Generic;
using System.IO;
using Unity.VisualScripting;
using UnityEngine;

public class CameraPanZoom : MonoBehaviour
{
    public Camera activeCamera;
    private Vector3 touchStart;
    void Start()
    {
        Debug.Log(Camera.main.GameObject().name);
        Debug.Log(activeCamera.GameObject().name);
    }
    
    void Update()
    {
        if (Input.GetMouseButtonDown(0)) //This is also used for touch input (not just mouse)
        {
            var currentMousePosition = new Vector3(Input.mousePosition.x, Input.mousePosition.y, 0f);
            touchStart = activeCamera.ScreenToWorldPoint(currentMousePosition);
            Debug.Log(touchStart);
        }
        if (Input.GetMouseButton(0))
        {
            var currentMousePosition = Input.mousePosition;
            currentMousePosition.z = 50f;
            Vector3 currentMouseScreenPosition = activeCamera.ScreenToWorldPoint(currentMousePosition);
            Debug.Log(currentMousePosition + "   " + currentMouseScreenPosition);
            Vector3 direction = touchStart - currentMouseScreenPosition;
            //Debug.Log("touchStart vector: " + touchStart + " currentPosition vector: " + currentMousePosition);
            Camera.main.transform.position += new Vector3(direction.x, 0f, direction.z);
        }
        
    }
}

using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class MapPin : MonoBehaviour
{
    public GameObject gameObjToFollow;
    public string displayText;
    public Vector3 mapPinPosition;
    
    private RectTransform UIElementRect;
    //private Transform followingObjTransform;
    private RectTransform canvasRect;
    private Camera mainCamera;

    void Start()
    {
        //Populate the variables
        //followingObjTransform = gameObjToFollow.transform;
        canvasRect = transform.parent.GetComponent<RectTransform>();
        UIElementRect = GetComponent<RectTransform>();
        mainCamera = Camera.main;
        //displayText = GetComponentInChildren<TMP_InputField>().text;
    }
    void Update()
    {
        PositionPinOnScreen();
    }

    private void PositionPinOnScreen()
    {
        //mapPinPosition = followingObjTransform.transform.position;
        Vector3 viewportPosition = mainCamera.WorldToViewportPoint(mapPinPosition);
        var sizeDelta = canvasRect.sizeDelta;
        var screenPosition = new Vector2(
            ((viewportPosition.x*sizeDelta.x)-(sizeDelta.x*0.5f)),
            ((viewportPosition.y*sizeDelta.y)-(sizeDelta.y*0.5f)));
        UIElementRect.anchoredPosition = screenPosition;
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MapPinOverlay : MonoBehaviour
{
    public GameObject gameObjToFollow;
    
    private Vector3 mapPinPosition;
    private RectTransform UIElementRect;
    private Transform mapPinTransform;
    private RectTransform canvasRect;
    private Camera mainCamera;

    void Start()
    {
        //Populate the variables
        mapPinTransform = gameObjToFollow.transform;
        canvasRect = transform.parent.GetComponent<RectTransform>();
        UIElementRect = GetComponent<RectTransform>();
        mainCamera = Camera.main;
    }
    void Update()
    {
        //transform.rotation = Camera.main.transform.rotation;
        //GetComponent<RectTransform>().position = Camera.main.WorldToViewportPoint(mapPinPosition);
        mapPinPosition = mapPinTransform.transform.position;
        Vector3 viewportPosition = mainCamera.WorldToViewportPoint(mapPinPosition);
        var sizeDelta = canvasRect.sizeDelta;
        var screenPosition = new Vector2(
            ((viewportPosition.x*sizeDelta.x)-(sizeDelta.x*0.5f)),
            ((viewportPosition.y*sizeDelta.y)-(sizeDelta.y*0.5f)));
        
        UIElementRect.anchoredPosition = screenPosition;
    }
}

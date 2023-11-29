using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Serialization;
using UnityEngine.UI;

public class MapPinFactory : MonoBehaviour
{
    public GameObject mapPinPrefab;
    public Color medicalCenterColor;
    public Color emptyKnobColor;
    [FormerlySerializedAs("medicPinKnobColor")] public Color medicKnobColor;
    
    public Color sportsColor;

    private void Start()
    {
        var buildings = (Building[])FindObjectsOfType(typeof(Building));
        foreach (var building in buildings)
        {
            var mapPin = Instantiate(mapPinPrefab).GetComponent<MapPin>();
            var pinGameObj = mapPin.gameObject;
            pinGameObj.GetComponentInChildren<TMP_Text>().text = building.abbreviation;
            pinGameObj.tag = "MapPin";
            pinGameObj.name = building.gameObject.name;
            mapPin.mapPinPosition = building.mapPinPosition;
            mapPin.transform.parent = transform;

            if (pinGameObj.name.Equals("Medic"))
            {
                var centerKnobImage = pinGameObj.transform.GetChild(0).GetComponent<RawImage>();
                centerKnobImage.color = medicKnobColor;
                
                var mainColorImage = pinGameObj.transform.GetChild(0).GetChild(0).GetComponent<Image>(); //1st child of the child contains the main color element
                mainColorImage.color = medicalCenterColor;
            }
            else if (string.IsNullOrWhiteSpace(building.abbreviation))
            {
                var centerKnobImage = pinGameObj.transform.GetChild(0).GetComponent<RawImage>();
                centerKnobImage.color = emptyKnobColor;
            }

                
        }
    }
}

using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class MapPinFactory : MonoBehaviour
{
    public GameObject mapPinPrefab;

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
        }
    }
}

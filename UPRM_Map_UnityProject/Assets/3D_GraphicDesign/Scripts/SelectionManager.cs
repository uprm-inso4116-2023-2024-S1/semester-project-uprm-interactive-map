using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.EventSystems;

public class SelectionManager : MonoBehaviour
{
    public Material selectedMat;
    public Material defaultMat;
    //private List<GameObject> buildings;
    private List<Building> buildings = new();
    private GameObject[] mapPins;

    private class Building
    {
        public string name;
        public Renderer render;
        public GameObject mapPin;
        public bool isSelected;
    }

    private void Awake()
    {
        #if UNITY_WEBGL == true && UNITY_EDITOR == false
            WebGLInput.captureAllKeyboardInput = false;
        #endif
    }

    void Start()
    {
        mapPins = GameObject.FindGameObjectsWithTag("MapPin");
        foreach  (var buildingObj in GameObject.FindGameObjectsWithTag("Building"))
        {
            buildings.Add(new Building
                {
                    name = buildingObj.name,
                    render = buildingObj.GetComponent<Renderer>(),
                    mapPin = MapPinOfBuildingName(buildingObj.name),
                    isSelected = false
                });
        }
    }
    
    private GameObject MapPinOfBuildingName(string buildingName)
    {
        foreach (var mapPinObj in mapPins)
        {
            if (mapPinObj.name.Equals(buildingName))
            {
                return mapPinObj;
            }
        }
        return null;
    }
    
    //case sensitive. can be multiple building names separated by commas and no space
    public void MakeBuildingSelected(string buildingsNames) 
    {
        DeselectAllBuildings();
        var namesArr = buildingsNames.Split(',');
        foreach (var buildingName in namesArr)
        {
            foreach (var building in buildings)
            {
                if (building.name.Equals(buildingName))
                {
                    building.isSelected = true;
                }
            }
        }
        UpdateSelected();
    }
    
    private void UpdateSelected()
    {
        foreach (var building in buildings)
        {
            if (building.isSelected)
            {
                building.render.material = selectedMat;
                building.mapPin.SetActive(true);
            }
            else
            {
                building.render.material = defaultMat;
                building.mapPin.SetActive(false);
            }
        }
    }
    
    public void DeselectAllBuildings()
    {
        foreach (var building in buildings)
        {
            building.isSelected = false;
        }
        SetAllToUnselected();
    }

    private void SetAllToUnselected()
    {
        foreach (var building in buildings)
        {
            building.render.material = defaultMat;
            building.mapPin.SetActive(true);
        }
    }
}

using System;
using JetBrains.Annotations;
using UnityEngine;
using UnityEngine.Serialization;

public class Building: MonoBehaviour
{
    public string abbreviation;
    public Vector3 mapPinPosition;
    
    private string shortName;

    private void Awake()
    {
        shortName = gameObject.name;
        mapPinPosition = transform.GetChild(0).transform.position;
    }
}
